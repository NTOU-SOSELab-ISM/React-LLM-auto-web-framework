export const fetchDrinkData = async () => {
    // 模擬從CSV載入資料，這裡是虛擬的假資料
    return [
      { name: '綠茶', sizes: ['500ml', '700ml', '1000ml'], prices: [25, 30, 35] },
      { name: '紅茶', sizes: ['500ml', '700ml', '1000ml'], prices: [30, 35, 40] },
      { name: '奶茶', sizes: ['500ml', '700ml', '1000ml'], prices: [35, 40, 45] }
    ];
  };
  