// foodLibraryService.js
// 负责管理本地食物库（localStorage）

const STORAGE_KEY = 'foodLibrary';

/**
 * 内部：加载并解析本地存储的食物库
 * @returns {Array<{name: string, cal: number}>}
 */
function loadLibrary() {
  const json = localStorage.getItem(STORAGE_KEY);
  try {
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('解析 foodLibrary 数据失败:', e);
    return [];
  }
}

/**
 * 内部：将食物库数组保存到 localStorage
 * @param {Array<{name: string, cal: number}>} lib 
 */
function saveLibrary(lib) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lib));
}

/**
 * 获取所有食物库条目
 * @returns {Promise<Array<{name: string, cal: number}>>}
 */
export function getAllFoods() {
  return Promise.resolve(loadLibrary());
}

/**
 * 添加一个食物到库中
 * @param {{name: string, cal: number}} item 
 * @returns {Promise<void>}
 */
export function addFood(item) {
  const lib = loadLibrary();
  // 可以根据需求去重：如果已存在同名，先删除旧条目
  const filtered = lib.filter(f => f.name !== item.name);
  filtered.push(item);
  saveLibrary(filtered);
  return Promise.resolve();
}

/**
 * 根据名称删除食物条目
 * @param {string} name 
 * @returns {Promise<void>}
 */
export function removeFood(name) {
  const lib = loadLibrary();
  const filtered = lib.filter(f => f.name !== name);
  saveLibrary(filtered);
  return Promise.resolve();
}
