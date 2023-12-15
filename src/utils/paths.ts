import { resolve } from 'path'

// 项目根目录
export const projRoot = resolve(__dirname, '..', '..')

// src目录
export const srcRoot = resolve(projRoot, 'src')

// protos目录
export const protosRoot = resolve(srcRoot, 'protos')

// 获取client proto文件路径
export const resolveClientProtoPath = (filename) => resolve(protosRoot, `./client/${filename}.proto`)

// 获取service proto文件路径
export const resolveServiceProtoPath = (filename) => resolve(protosRoot, `./service/${filename}.proto`)
