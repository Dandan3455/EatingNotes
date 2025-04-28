// pendingFoodService.js
// 管理用户提交的“待审核”食物条目（localStorage）

const PENDING_KEY = 'pendingFood';

/**
 * 内部：加载并解析本地存储的待审核列表
 * @returns {Array<{name: string, cal: number}>}
 */
function loadPending() {
  const json = localStorage.getItem(PENDING_KEY);
  try {
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('解析 pendingFood 数据失败：', e);
    return [];
  }
}

/**
 * 内部：保存待审核列表到 localStorage
 * @param {Array<{name: string, cal: number}>} list
 */
function savePending(list) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(list));
}

/**
 * 获取所有待审核条目
 * @returns {Promise<Array<{name: string, cal: number}>>}
 */
export function getPendingFoods() {
  return Promise.resolve(loadPending());
}

/**
 * 添加一个待审核条目
 * @param {{name: string, cal: number}} item
 * @returns {Promise<void>}
 */
export function addPendingFood(item) {
  const list = loadPending();
  // 去重
  const filtered = list.filter(f => f.name !== item.name);
  filtered.push(item);
  savePending(filtered);
  return Promise.resolve();
}

/**
 * 根据名称删除待审核条目
 * @param {string} name
 * @returns {Promise<void>}
 */
export function removePendingFood(name) {
  const list = loadPending();
  const filtered = list.filter(f => f.name !== name);
  savePending(filtered);
  return Promise.resolve();
}

/**
 * 清空所有待审核条目（可选，用于审核通过后统一清理）
 * @returns {Promise<void>}
 */
export function clearPending() {
  localStorage.removeItem(PENDING_KEY);
  return Promise.resolve();
}
