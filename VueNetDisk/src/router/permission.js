import router from "~/router/index"
import { getToken, getRootToken } from "~/util/cookie"
import { toast } from "../util/notification"
import { useUserStore } from "../store"

router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    if (to.path == "/NotFound") {
        next()
    }

    console.log("========拦截")
    console.log(to.path)
    let isRoot = false;
    // 判断是不是管理员
    let token = getRootToken();
    if (token) {
        isRoot = true
    } else {
        token = getToken();
    }
    // 未登录强制跳转至登录页
    if (!token && to.path != "/login" && to.path != "/register" && to.path != "/") {
        toast("请先登录", "error");
        return next({ path: "/login" });
    }

    // 防止已登录用户再登录和注册
    if (token && (to.path == "/login" || to.path == "/register" || to.path == "/")) {
        if (isRoot) {
            return next({ path: "/root" });
        }
        return next({ path: "/index" });
    }
    // 管理员用户访问普通用户页面
    if (isRoot && !to.meta.isRoot) {
        console.log("管理员用户访问普通用户页面")
        return next({ path: "/NotFound" })
    }
    // 普通用户访问管理员用户页面
    if (!isRoot && to.meta.isRoot) {
        console.log("普通用户访问管理员用户页面")
        return next({ path: "/NotFound" })
    }

    // 已登录自动获取用户信息并储存
    if (token) {
        if (isRoot) {
            const root = useUserStore();
            await root.getRootInfo();
        } else {
            const user = useUserStore();
            await user.getInfo();
        }

    }

    next();
})