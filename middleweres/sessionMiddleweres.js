const sessionMiddlewere = (req, res, next) =>{
    if(req.session.user){
        /* if(req.session.user.role == 'user')(
            res.redirect('/products')
        )*/
        next() 
    }
    else{
        res.redirect('/')
    }
}


module.exports = sessionMiddlewere