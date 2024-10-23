// 模擬從CSV讀取的飲料資料
export function loadDrinkData() {
    return [
      {
        name: '綠茶',
        sizes: ['500ml', '700ml'],
        prices: [25, 30],
        temperatures: ['全冰', '少冰', '去冰', '熱'],
        sweetness: ['全糖', '8分糖', '5分糖', '3分糖', '無糖']
      },
      {
        name: '紅茶',
        sizes: ['500ml', '700ml'],
        prices: [25, 30],
        temperatures: ['全冰', '少冰', '去冰', '熱'],
        sweetness: ['全糖', '8分糖', '5分糖', '3分糖', '無糖']
      },
      {
        name: '奶茶',
        sizes: ['500ml', '700ml'],
        prices: [35, 40],
        temperatures: ['全冰', '少冰', '去冰', '熱'],
        sweetness: ['全糖', '8分糖', '5分糖', '3分糖', '無糖']
      }
    ]
  }