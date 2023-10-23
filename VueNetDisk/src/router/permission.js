import router from "~/router/index"
import { getToken } from "~/util/cookie"
import { toast } from "../util/notification"
import { useUserStore } from "../store"

router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    console.log("========拦截")
    // 未登录强制跳转至登录页
    const token = getToken();
    if (!token && to.path != "/login" && to.path != "/register") {
        toast("请先登录", "error");
        return next({ path: "/login" });
    }

    // 防止已登录用户再登录和注册
    if (token && (to.path == "/login" || to.path == "/register")) {
        if (from.path == "/") {
            return next({ path: "/index" });
        }
        return next({ path: from.path ? from.path : "/index" })
    }

    // 已登录自动获取用户信息并储存
    if (token) {
        const user = useUserStore();
        await user.getInfo();
    }

    next();
})