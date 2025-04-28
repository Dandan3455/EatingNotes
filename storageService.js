// storageService.js

/**
 * 读取指定日期的食物记录数组
 * @param {string} date - 'YYYY-MM-DD'
 * @returns {Promise<Array>}
 */
export function fetchRecords(date) {
  const data = localStorage.getItem(`records_${date}`);
  return Promise.resolve(data ? JSON.parse(data) : []);
}

/**
 * 保存指定日期的食物记录数组
 * @param {string} date - 'YYYY-MM-DD'
 * @param {Array} records
 * @returns {Promise<void>}
 */
export function saveRecords(date, records) {
  localStorage.setItem(`records_${date}`, JSON.stringify(records));
  return Promise.resolve();
}

/**
 * 读取指定日期的元数据（体重、目标热量）
 * @param {string} date - 'YYYY-MM-DD'
 * @returns {Promise<{ weight?: string, goalCalories?: string }>}
 */
export function fetchMeta(date) {
  const data = localStorage.getItem(`meta_${date}`);
  return Promise.resolve(data ? JSON.parse(data) : {});
}

/**
 * 保存指定日期的元数据（体重、目标热量）
 * @param {string} date - 'YYYY-MM-DD'
 * @param {{ weight?: string, goalCalories?: string }} meta
 * @returns {Promise<void>}
 */
export function saveMeta(date, meta) {
  localStorage.setItem(`meta_${date}`, JSON.stringify(meta));
  return Promise.resolve();
}
