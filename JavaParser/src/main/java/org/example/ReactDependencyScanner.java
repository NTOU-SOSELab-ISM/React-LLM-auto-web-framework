package org.example;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.regex.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class ReactDependencyScanner {

    // 支援的副檔名
    private static final String[] SUPPORTED_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx", ".html", ".css"};

    // 儲存元件及其相依性
    private Map<String, Set<String>> dependencyMap = new HashMap<>();

    // 專案根目錄
    private String projectRoot;

    public ReactDependencyScanner(String projectRoot) {
        this.projectRoot = projectRoot;
    }

    public void scan() throws IOException {
        List<File> files = listAllFiles(new File(projectRoot));
        Set<String> components = new HashSet<>();

        // 步驟 1：收集所有元件檔案
        for (File file : files) {
            if (isSupported(file)) {
                String componentName = getRelativePath(file);
                components.add(componentName);
                dependencyMap.putIfAbsent(componentName, new HashSet<>());
            }
        }

        // 步驟 2：解析每個元件的相依性
        for (File file : files) {
            if (isSupported(file)) {
                String componentName = getRelativePath(file);
                Set<String> dependencies = parseDependencies(file);
                for (String dep : dependencies) {
                    // 轉換相對路徑為元件名稱
                    String depComponent = resolveDependency(dep, file.getParentFile());
                    if (depComponent != null && components.contains(depComponent)) {
                        dependencyMap.get(componentName).add(depComponent);
                    }
                }
            }
        }
    }

    // 列出所有檔案
    private List<File> listAllFiles(File directory) {
        List<File> fileList = new ArrayList<>();
        File[] files = directory.listFiles();
        if(files != null){
            for (File file : files) {
                if (file.isDirectory()) {
                    fileList.addAll(listAllFiles(file));
                } else {
                    fileList.add(file);
                }
            }
        }
        return fileList;
    }

    // 檢查檔案是否支援
    private boolean isSupported(File file) {
        for (String ext : SUPPORTED_EXTENSIONS) {
            if (file.getName().endsWith(ext)) {
                return true;
            }
        }
        return false;
    }

    // 取得相對路徑作為元件名稱
    private String getRelativePath(File file) {
        Path path = Paths.get(projectRoot).toAbsolutePath();
        Path filePath = file.toPath().toAbsolutePath();
        return path.relativize(filePath).toString().replace("\\", "/");
    }

    // 解析檔案以提取相依性
    private Set<String> parseDependencies(File file) throws IOException {
        Set<String> dependencies = new HashSet<>();
        String content = new String(Files.readAllBytes(file.toPath()));

        // 正則表達式匹配 import 語句
        Pattern importPattern = Pattern.compile("import\\s+.*?\\s+from\\s+['\"](.*?)['\"];?");
        Matcher matcher = importPattern.matcher(content);
        while (matcher.find()) {
            String dep = matcher.group(1);
            dependencies.add(dep);
        }

        // 匹配 require 語句
        Pattern requirePattern = Pattern.compile("require\\(['\"](.*?)['\"]\\)");
        matcher = requirePattern.matcher(content);
        while (matcher.find()) {
            String dep = matcher.group(1);
            dependencies.add(dep);
        }

        return dependencies;
    }

    // 解析依賴路徑為元件名稱
    private String resolveDependency(String dep, File currentDir) {
        if (dep.startsWith(".")) {  // 使用 String 而非 char
            // 相對路徑
            File depFile = new File(currentDir, dep);
            for (String ext : SUPPORTED_EXTENSIONS) {
                File fileWithExt = new File(depFile.getPath() + ext);
                if (fileWithExt.exists()) {
                    return getRelativePath(fileWithExt);
                }
            }
            // 如果沒有副檔名，假設是目錄並尋找 index 檔案
            File indexFile = new File(depFile, "index.js");
            if (indexFile.exists()) {
                return getRelativePath(indexFile);
            }
        }
        // 其他情況（如 node_modules），可以根據需求處理
        // 返回 null 表示無法解析為專案內部元件
        return null;
    }

    // 生成 DOT 格式的有向圖描述檔
    public void generateDotFile(String outputPath) throws IOException {
        File outFile = new File(outputPath);

        // 檢查父目錄是否存在，如果不存在則嘗試創建
        File parentDir = outFile.getParentFile();
        if (parentDir != null && !parentDir.exists()) {
            boolean dirsCreated = parentDir.mkdirs();
            if (!dirsCreated) {
                throw new IOException("無法創建目錄：" + parentDir.getAbsolutePath());
            }
        }

        // 檢查是否為有效的文件路徑
        if (outFile.isDirectory()) {
            throw new IOException("輸出路徑是目錄，不是文件：" + outputPath);
        }

        BufferedWriter writer = new BufferedWriter(new FileWriter(outFile));
        writer.write("digraph DependencyGraph {\n");

        for (String component : dependencyMap.keySet()) {
            String sanitizedComponent = sanitizeLabel(component);
            writer.write("    \"" + sanitizedComponent + "\";\n");
        }

        for (Map.Entry<String, Set<String>> entry : dependencyMap.entrySet()) {
            String from = sanitizeLabel(entry.getKey());
            for (String to : entry.getValue()) {
                String sanitizedTo = sanitizeLabel(to);
                writer.write("    \"" + from + "\" -> \"" + sanitizedTo + "\";\n");
            }
        }

        writer.write("}\n");
        writer.close();
    }

    // 將 dependencyMap 儲存為 JSON 檔案
    public void saveDependencyMapAsJson(String outputPath) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        mapper.writeValue(new File(outputPath), dependencyMap);
    }

    // 清理標籤中的特殊字符
    private String sanitizeLabel(String label) {
        return label.replace("\"", "\\\"");
    }

    public static void main(String[] args) {
//        String projectRoot = args[0];
//        String dotOutputPath = args[1];
//        String jsonOutputPath = args[2];
        String projectRoot = "../react-test-project";
        String jsonOutputPath = "output.json";

        ReactDependencyScanner scanner = new ReactDependencyScanner(projectRoot);
        try {
            scanner.scan();
            scanner.saveDependencyMapAsJson(jsonOutputPath);
            System.out.println("相依性Map已儲存至 " + jsonOutputPath);
        } catch (IOException e) {
            System.err.println("發生錯誤：" + e.getMessage());
            e.printStackTrace();
        }
    }
}
