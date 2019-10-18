/**
 * 过滤参数
 *
 * @param {T} param 对象
 * @returns {T} param 过滤后的对象
 */
export function filterParam<T extends Record<string, any>>(param: T): T {
    Object.keys(param).forEach(item => param[item] === undefined || param[item] === null && delete param[item]);
    return param;
}


/**
 * 检查数组是否全部符合条件
 *
 * @param f 处理函数
 * @param {Array<any>} arr 处理数据
 * @returns {boolean}
 */
export function isEvery(f: any, arr: Array<any>): boolean {
    return arr.every(f);
}

/**
 * 检查数组中是否存在一个符合条件的元素
 *
 * @param f 处理函数
 * @param {Array<any>} arr 处理数据
 * @returns {boolean}
 */
export function isSome(f: any, arr: Array<any>): boolean {
    return arr.some(f);
}


/**
 * 深克隆一个对象
 *
 * @param {T} obj
 * @returns {T}
 */
export function clone<T extends Record<string, any>>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 函数组合
 *
 * @param args
 * @returns {(arg) => any}
 */
export function compose(...args): any {
    let _args: any = args;
    let start: number = _args.length - 1;
    return arg => {
        let i: number = start - 1;
        let result: any = _args[start].call(this, arg);
        while (i >= 0){
            result = _args[i].call(this, result);
            i--;
        }
        return result;
    };
}


/**
 * 三目运算
 *
 * @param left
 * @param right
 * @returns {(value) => any}
 *
 * 例子：
 *
 * const a = 2;
 * eitherValue(1, 2)(a > 1) output: 1
 * eitherValue(1, 2)(a > 3) output: 2
 */
export function eitherValue(left, right) {
    return value => value ? left : right;
}

/**
 * 数组排序
 *
 * @param {1 | -1} order 1 从小到大 -1 从大到小
 * @param {string} key 数组子元素为对象时必填
 * @returns {any}
 *
 * 例子：
 *
 * sort(1)([1, 2]) output: [1, 2]
 * sort(-1)([1, 2]) output: [2, 1]
 * sort(1, 'b')([{a: 1, b: 2}, {a: 3, b: 1}]) output: [ { a: 3, b: 1 }, { a: 1, b: 2 } ]
 * sort(1, 'a')([{a: 1, b: 2}, {a: 3, b: 1}]) output: [ { a: 1, b: 2 }, { a: 3, b: 1 } ]
 */
export function sort(order: 1 | -1, key?: string): any {
    return arr => arr.sort((a, b) => key ? a[key] - order * b[key] : a - order * b);
}