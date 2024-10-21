import java.io.IOException;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.*;

public class ReactDependencyScanner {

    // 正则表达式模式，用于匹配导入语句
    private static final Pattern IMPORT_PATTERN = Pattern.compile(
        "^\\s*import\\s+(?:[^'\";]+\\s+from\\s+)?['\"]([^'\"]+)['\"];?", Pattern.MULTILINE);

    private Map<String, Set<String>> dependencyGraph = new HashMap<>();

    public void scanDirectory(String projectPath) throws IOException {
        Path startPath = Paths.get(projectPath);

        System.out.println(startPath);

        Files.walk(startPath)
            .filter(Files::isRegularFile)
            .filter(p -> p.toString().endsWith(".js") || p.toString().endsWith(".jsx")
                    || p.toString().endsWith(".ts") || p.toString().endsWith(".tsx"))
            .forEach(this::processFile);
    }

    private void processFile(Path filePath) {
        try {
            String content = Files.readString(filePath, StandardCharsets.UTF_8);

            String componentName = getComponentName(filePath, content);

            if (componentName == null) {
                // 跳过不定义组件的文件
                return;
            }

            Set<String> dependencies = getDependencies(content);

            dependencyGraph.put(componentName, dependencies);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String getComponentName(Path filePath, String content) {
        // 简化处理：使用文件名作为组件名
        String fileName = filePath.getFileName().toString();
        String componentName = fileName.replaceFirst("\\.[^.]+$", ""); // 去掉扩展名
        return componentName;
    }

    private Set<String> getDependencies(String content) {
        Set<String> dependencies = new HashSet<>();
        Matcher matcher = IMPORT_PATTERN.matcher(content);
        while (matcher.find()) {
            String importPath = matcher.group(1);

            // 提取组件名
            String importedComponent = extractComponentNameFromImportPath(importPath);

            if (importedComponent != null) {
                dependencies.add(importedComponent);
            }
        }
        return dependencies;
    }

    private String extractComponentNameFromImportPath(String importPath) {
        // 处理相对路径，提取最后的组件名
        String[] parts = importPath.split("[/\\\\]");
        String lastPart = parts[parts.length - 1];
        String componentName = lastPart.replaceFirst("\\.[^.]+$", ""); // 去掉扩展名

        return componentName;
    }

    public void outputDependencyGraph(String outputPath) throws IOException {
        // 将依赖关系图输出为 JSON 文件
        Path outputFile = Paths.get(outputPath);

        StringBuilder sb = new StringBuilder();
        sb.append("{\n");

        int count = 0;
        for (Map.Entry<String, Set<String>> entry : dependencyGraph.entrySet()) {
            String component = entry.getKey();
            Set<String> deps = entry.getValue();

            sb.append("  \"").append(component).append("\": ");
            sb.append(deps.toString());

            if (++count < dependencyGraph.size()) {
                sb.append(",");
            }
            sb.append("\n");
        }

        sb.append("}\n");

        Files.writeString(outputFile, sb.toString(), StandardCharsets.UTF_8);
    }

    public static void main(String[] args) {
//        if (args.length != 2) {
//            System.out.println("用法: java ReactDependencyScanner <项目路径> <输出文件>");
//            return;
//        }

//        String projectPath = args[0];
//        String outputFile = args[1];
        String projectPath = "../react-test-project";
        String outputFile = "output.json";

        ReactDependencyScanner scanner = new ReactDependencyScanner();
        try {
            System.out.println("123");
            scanner.scanDirectory(projectPath);
            scanner.outputDependencyGraph(outputFile);
            System.out.println("依赖关系图已写入 " + outputFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
