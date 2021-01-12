/* eslint-disable no-useless-escape */
// 身份证
export const idCardReg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/

// 中文姓名
export const nameReg = /^(?:[\u4e00-\u9fa5·]{2,16})$/

// 手机号
export const phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/

// 固定号码
export const fixedNumberReg = /^(\+\d{2}-)?(0((\d{2,3}-)|(\d{2,3})))?\d{7,8}$/

// 联系方式(手机+固定电话)
export const contactReg = /^((?:(?:\+|00)86)?1\d{10})|((\+\d{2}-)?(0((\d{2,3}-)|(\d{2,3})))?\d{7,8})$/

// 车牌号
export const carReg = /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/

// 用户名
export const usernameReg = /^(?=.*[a-zA-Z]+)[a-zA-Z0-9_-]{4,16}$/

// 密码
export const passwordReg = /^[a-zA-Z0-9_-]{6,}$/

// 英文数字
export const englishLetterAndNumberReg = /^[A-Za-z0-9]+$/

// 数字
export const numberReg = /^[0-9]+$/

// 数字包括小数
export const numberFloatReg = /^[0-9.]+$/

// 经度
export const lngReg = /^[\-\+]?(0?\d{1,2}|0?\d{1,2}\.\d{1,15}|1[0-7]?\d{1}|1[0-7]?\d{1}\.\d{1,15}|180|180\.0{1,15})$/

// 纬度
export const latReg = /^[\-\+]?([0-8]?\d{1}|[0-8]?\d{1}\.\d{1,15}|90|90\.0{1,15})$/

// 经纬度
export const coordinateReg = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})[,，]\s?[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/

// ip-v4
export const ipv4Reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
