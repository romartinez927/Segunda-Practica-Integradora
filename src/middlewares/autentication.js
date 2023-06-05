import { autenticacionUserPass, autenticacionPorGithub } from "./passport.js"

export function auth(req, res, next) {
    if (autenticacionUserPass || autenticacionPorGithub) {
        return next()
    } else {
        res.redirect("/register")
    }
}

export function soloLogueadosView(req, res, next) {
    if (!req.isAuthenticated()) return res.redirect('/login')
    next()
}

export function alreadyHasSession(req, res, next) {
    if (req.session.passport) return res.redirect('/products')
    next()
}

const isAdmin = async (req, res, next) => {
    const userEmail = req.session.user?.email;
    try {
        if (userEmail) {
            const user = await usersService.getUserByEmail(userEmail);
            if (user.role === 'admin') {
                next();
            } else {
                res.status(403).json({ message: 'Access denied' })
            }
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const isUser = async (req, res, next) => {
    const userEmail = req.session.user?.email;
    try {
        if (userEmail) {
            const user = await usersService.getUserByEmail(userEmail);
            if (user.role === 'user') {
                next();
            } else {
                res.status(403).json({ message: 'Access denied' })
            }
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
