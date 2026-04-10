import type { RouteLocationNormalized, Router, RouteRecordNormalized } from 'vue-router'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { isUrl } from '@/utils/is'
import { cloneDeep, omit } from 'lodash-es'
import qs from 'qs'

const modules = import.meta.glob('../views/**/*.{vue,tsx}')
/**
 * 注册一个异步组件
 * @param componentPath 例:/bpm/oa/leave/detail
 */
export const registerComponent = (componentPath: string) => {
  for (const item in modules) {
    if (item.includes(componentPath)) {
      // 使用异步组件的方式来动态加载组件
      // @ts-ignore
      return defineAsyncComponent(modules[item])
    }
  }
}
/* Layout */
export const Layout = () => import('@/layout/Layout.vue')

export const getParentLayout = () => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: 'ParentLayout'
      })
    })
}

// 按照路由中meta下的rank等级升序来排序路由
export const ascending = (arr: any[]) => {
  arr.forEach((v) => {
    if (v?.meta?.rank === null) v.meta.rank = undefined
    if (v?.meta?.rank === 0) {
      if (v.name !== 'home' && v.path !== '/') {
        console.warn('rank only the home page can be 0')
      }
    }
  })
  return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
    return a?.meta?.rank - b?.meta?.rank
  })
}

export const getRawRoute = (route: RouteLocationNormalized): RouteLocationNormalized => {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path
        }))
      : undefined) as RouteRecordNormalized[]
  }
}

/**
 * 菜单 path / component 与 views 目录名不一致时的兼容匹配（例如 path 为 audit-record，目录为 auditRecord）。
 * 依次尝试原始串、去掉首尾 /、以及将短横线后字母转成大写（近似 kebab 段 -> 驼峰目录名）。
 */
// function findViewFileIndex(modulesRoutesKeys: string[], route: AppCustomRouteRecordRaw): number {

//   const kebabToCamelPath = (p: string) => p.replace(/-([a-z])/g, (_m, c: string) => c.toUpperCase())

//   const candidates: string[] = []
//   if (route.component) {
//     candidates.push(route.component)

//     const camelComp = kebabToCamelPath(route.component)
//     if (camelComp !== route.component) {
//       candidates.push(camelComp)
//     }
//   }
//   const rawPath =
//     route.path?.indexOf('?') > -1 && !isUrl(route.path) ? route.path.split('?')[0] : route.path
//   if (rawPath) {
//     candidates.push(rawPath)
//     candidates.push(rawPath.replace(/^\//, ''))
//     const camelPath = kebabToCamelPath(rawPath)
//     if (camelPath !== rawPath) {
//       candidates.push(camelPath)
//       candidates.push(camelPath.replace(/^\//, ''))
//     }
//   }
//   for (const search of candidates) {
//     if (!search) continue
//     const idx = modulesRoutesKeys.findIndex((ev) => ev.includes(search))
//     if (idx > -1) {
//       return idx
//     }
//     console.log('候选路径列表:', candidates)
//     console.log('找到的索引:', idx)
//   }

//   return -1
// }

// function findViewFileIndex(modulesRoutesKeys: string[], route: AppCustomRouteRecordRaw): number {
//   const kebabToCamelPath = (p: string) => p.replace(/-([a-z])/g, (_m, c: string) => c.toUpperCase())

//   const candidates: string[] = []
//   if (route.component) {
//     candidates.push(route.component)
//     const camelComp = kebabToCamelPath(route.component)
//     if (camelComp !== route.component) {
//       candidates.push(camelComp)
//     }
//   }

//   const rawPath =
//     route.path?.indexOf('?') > -1 && !isUrl(route.path) ? route.path.split('?')[0] : route.path
//   if (rawPath) {
//     candidates.push(rawPath)
//     candidates.push(rawPath.replace(/^\//, ''))
//     const camelPath = kebabToCamelPath(rawPath)
//     if (camelPath !== rawPath) {
//       candidates.push(camelPath)
//       candidates.push(camelPath.replace(/^\//, ''))
//     }
//   }

//   console.log('=== findViewFileIndex 调试 ===')
//   console.log('后端 component:', route.component)
//   console.log('候选路径:', candidates)
//   console.log('可用的 modules keys (前10个):', modulesRoutesKeys.slice(0, 10))

//   for (const search of candidates) {
//     if (!search) continue
//     const idx = modulesRoutesKeys.findIndex((ev) => ev.includes(search))
//     console.log(`检查 "${search}": ${idx > -1 ? '找到索引 ' + idx : '未找到'}`)
//     if (idx > -1) {
//       console.log('匹配到的完整路径:', modulesRoutesKeys[idx])
//       return idx
//     }
//   }

//   console.error('未找到匹配的组件！')
//   return -1
// }
function findViewFileIndex(modulesRoutesKeys: string[], route: AppCustomRouteRecordRaw): number {
  // 专门针对 asset/file 的调试
  if (route.component && route.component.includes('asset/asset-file')) {
    console.log('🎯 调试 asset/file 匹配:')
    console.log('  component:', route.component)
    console.log('  查找包含 "asset/file/index" 的 key:')
    const found = modulesRoutesKeys.filter((key) => key.includes('asset/asset-file/index'))
    console.log('  找到的 keys:', found)
  }
  // 修改驼峰转换函数，只处理真正的短横线，不要处理斜杠
  const kebabToCamelPath = (p: string) => {
    // 只将 - 后面的字母转为大写，保留 / 不变
    return p.replace(/-([a-z])/g, (_m, c: string) => c.toUpperCase())
  }

  const candidates: string[] = []
  if (route.component) {
    candidates.push(route.component)
    // 添加 .vue 后缀的版本
    if (!route.component.endsWith('.vue') && !route.component.endsWith('.tsx')) {
      candidates.push(route.component + '.vue')
      candidates.push(route.component + '.tsx')
    }
    const camelComp = kebabToCamelPath(route.component)
    if (camelComp !== route.component) {
      candidates.push(camelComp)
      // 驼峰转换后也添加后缀
      if (!camelComp.endsWith('.vue') && !camelComp.endsWith('.tsx')) {
        candidates.push(camelComp + '.vue')
        candidates.push(camelComp + '.tsx')
      }
    }
  }

  const rawPath =
    route.path?.indexOf('?') > -1 && !isUrl(route.path) ? route.path.split('?')[0] : route.path
  if (rawPath) {
    candidates.push(rawPath)
    candidates.push(rawPath.replace(/^\//, ''))
    // 为 rawPath 添加后缀
    if (!rawPath.endsWith('.vue') && !rawPath.endsWith('.tsx')) {
      candidates.push(rawPath + '.vue')
      candidates.push(rawPath + '.tsx')
    }
    const camelPath = kebabToCamelPath(rawPath)
    if (camelPath !== rawPath) {
      candidates.push(camelPath)
      candidates.push(camelPath.replace(/^\//, ''))
    }
  }

  // 【关键修改】直接使用路径的最后一个部分作为文件名进行匹配
  // 例如：crm/contract/config/index -> 尝试匹配 index.vue
  if (route.component) {
    const parts = route.component.split('/')
    const lastPart = parts[parts.length - 1]
    if (lastPart) {
      candidates.push(lastPart)
      candidates.push(lastPart + '.vue')
      candidates.push(lastPart + '.tsx')
    }
  }

  for (const search of candidates) {
    if (!search) continue
    const idx = modulesRoutesKeys.findIndex((ev) => ev.includes(search))
    if (idx > -1) {
      // console.log('匹配到的完整路径:', modulesRoutesKeys[idx])
      return idx
    }
  }

  console.error('未找到匹配的组件！')
  return -1
}

// 后端控制路由生成
export const generateRoute = (routes: AppCustomRouteRecordRaw[]): AppRouteRecordRaw[] => {
  const res: AppRouteRecordRaw[] = []
  const modulesRoutesKeys = Object.keys(modules)
  for (const route of routes) {
    // 1. 生成 meta 菜单元数据
    const meta = {
      title: route.name,
      icon: route.icon,
      hidden: !route.visible,
      noCache: !route.keepAlive,
      alwaysShow:
        route.children &&
        route.children.length > 0 &&
        (route.alwaysShow !== undefined ? route.alwaysShow : true)
    } as any
    // 特殊逻辑：如果后端配置的 MenuDO.component 包含 ?，则表示需要传递参数
    // 此时，我们需要解析参数，并且将参数放到 meta.query 中
    // 这样，后续在 Vue 文件中，可以通过 const { currentRoute } = useRouter() 中，通过 meta.query 获取到参数
    if (route.component && route.component.indexOf('?') > -1) {
      const query = route.component.split('?')[1]
      route.component = route.component.split('?')[0]
      meta.query = qs.parse(query)
    }

    // 2. 生成 data（AppRouteRecordRaw）
    // 路由地址转首字母大写驼峰，作为路由名称，适配keepAlive
    let data: AppRouteRecordRaw = {
      path:
        route.path.indexOf('?') > -1 && !isUrl(route.path) ? route.path.split('?')[0] : route.path, // 注意，需要排除 http 这种 url，避免它带 ? 参数被截取掉
      name:
        route.componentName && route.componentName.length > 0
          ? route.componentName
          : toCamelCase(route.path, true),
      redirect: route.redirect,
      meta: meta
    }
    //处理顶级非目录路由
    if (!route.children && route.parentId == 0 && route.component) {
      data.component = Layout
      data.meta = {
        hidden: meta.hidden
      }
      data.name = toCamelCase(route.path, true) + 'Parent'
      data.redirect = ''
      meta.alwaysShow = true
      const childrenData: AppRouteRecordRaw = {
        path: '',
        name:
          route.componentName && route.componentName.length > 0
            ? route.componentName
            : toCamelCase(route.path, true),
        redirect: route.redirect,
        meta: meta
      }
      const index = findViewFileIndex(modulesRoutesKeys, route)
      childrenData.component = modules[modulesRoutesKeys[index]]
      data.children = [childrenData]
    } else {
      // 目录
      if (route.children?.length) {
        data.component = Layout
        data.redirect = getRedirect(route.path, route.children)
        // 外链
      } else if (isUrl(route.path)) {
        data = {
          path: '/external-link',
          component: Layout,
          meta: {
            name: route.name
          },
          children: [data]
        } as AppRouteRecordRaw
        // 菜单
      } else {
        // 对后端传component组件路径和不传做兼容（如果后端传component组件路径，那么path可以随便写，如果不传，component组件路径会根path保持一致）
        const index = findViewFileIndex(modulesRoutesKeys, route)
        data.component = modules[modulesRoutesKeys[index]]
      }
      if (route.children) {
        data.children = generateRoute(route.children)
      }
    }
    res.push(data as AppRouteRecordRaw)
  }
  return res
}
export const getRedirect = (parentPath: string, children: AppCustomRouteRecordRaw[]) => {
  if (!children || children.length == 0) {
    return parentPath
  }
  const path = generateRoutePath(parentPath, children[0].path)
  // 递归子节点
  if (children[0].children) return getRedirect(path, children[0].children)
}
const generateRoutePath = (parentPath: string, path: string) => {
  if (parentPath.endsWith('/')) {
    parentPath = parentPath.slice(0, -1) // 移除默认的 /
  }
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  return parentPath + path
}
export const pathResolve = (parentPath: string, path: string) => {
  if (isUrl(path)) return path
  if (!path) return parentPath // 修复 path 为空时返回 parentPath，避免拼接出错 https://t.zsxq.com/QVr6b
  const childPath = path.startsWith('/') ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/+/g, '/')
}

// 路由降级
export const flatMultiLevelRoutes = (routes: AppRouteRecordRaw[]) => {
  const modules: AppRouteRecordRaw[] = cloneDeep(routes)
  for (let index = 0; index < modules.length; index++) {
    const route = modules[index]
    if (!isMultipleRoute(route)) {
      continue
    }
    promoteRouteLevel(route)
  }
  return modules
}

// 层级是否大于2
const isMultipleRoute = (route: AppRouteRecordRaw) => {
  if (!route || !Reflect.has(route, 'children') || !route.children?.length) {
    return false
  }

  const children = route.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}

// 生成二级路由
const promoteRouteLevel = (route: AppRouteRecordRaw) => {
  let router: Router | null = createRouter({
    routes: [route as RouteRecordRaw],
    history: createWebHashHistory()
  })

  const routes = router.getRoutes()
  addToChildren(routes, route.children || [], route)
  router = null

  route.children = route.children?.map((item) => omit(item, 'children'))
}

// 添加所有子菜单
const addToChildren = (
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteRecordRaw
) => {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteRecordRaw)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}
const toCamelCase = (str: string, upperCaseFirst: boolean) => {
  str = (str || '')
    .replace(/-(.)/g, function (group1: string) {
      return group1.toUpperCase()
    })
    .replaceAll('-', '')

  if (upperCaseFirst && str) {
    str = str.charAt(0).toUpperCase() + str.slice(1)
  }

  return str
}
