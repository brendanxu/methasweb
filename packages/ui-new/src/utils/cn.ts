// 类名合并工具
import { clsx, type ClassValue } from 'clsx'

/**
 * 合并和规范化类名
 * @param inputs 类名输入
 * @returns 规范化的类名字符串
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}