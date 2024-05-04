import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// lazy函数对组件进行导入
const Shop = lazy(() => import('../pages/Shop'))
const Admin = lazy(() => import('../pages/Admin'))
const Main = lazy(() => import('../pages/Main'))
const Shoper = lazy(() => import('../pages/Orders'))
const Users = lazy(() => import('../pages/Users'))
const PutOrder = lazy(() => import('../pages/PutOrder'))
const NotFound = lazy(() => import('../pages/NotFound'))

// 配置路由实例
const router = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={'加载中...'}><Shop /></Suspense>,
    },
    {
        path: '/Admin',
        element: <Suspense fallback={'加载中...'}><Admin /></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={'加载中...'}><Main /> </Suspense>// 子路由的组件
            },
            {
                path: 'Main',
                element: <Suspense fallback={'加载中...'}><Main /> </Suspense> // 子路由的组件
            },
            {
                path: 'Orders',
                element: <Suspense fallback={'加载中...'}><Shoper /> </Suspense> // 子路由的组件
            },
            {
                path: 'PutOrder',
                element: <Suspense fallback={'加载中...'}><PutOrder /> </Suspense> // 子路由的组件
            },
            {
                path: 'Users',
                element: <Suspense fallback={'加载中...'}><Users /> </Suspense> // 子路由的组件
            },

        ]
    },
    {
        path: '*',
        element: <Suspense fallback={'加载中...'}><NotFound /> </Suspense>,
    }
])

export default router