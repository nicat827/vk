
    async registrateVk(userData) {
        try {
            const response = await VkService.registrateVk(userData)
            if (response) {
                this.setAuth(true)
            }
            
            
            
        }

        catch (e) {
            console.log(e)
        }
        

    }

    async authVk() {
        this.setLoading(true)
        
       try {
            console.log('log before')
            const VK = window.VK;
            VK.Auth.login(async (res) => {
                if (res.session) {
                    console.log(res)
                    localStorage.setItem('sid', res.session.sid)
                    this.setId(res.session.user.setId)
                    const isUser = await this.getUserFromDb(res.session.user.id)
                    
                    if (!isUser) {
                        const photo = await this.callVKApi(res.session.user.id)
                        console.log(photo);
                        if (res.session.user.id === '308516627') {
                            this.setAdmin(true)
                        }
                        
                        
                        this.setUserData({id:res.session.user.id, href:res.session.user.href, name:res.session.user.first_name, surname:res.session.user.last_name, expire:res.session.expire,photo, isAdmin:this.isAdmin})
                        this.registrateVk(this.userData)
                    } 
                    
                    
            

                    
                }
            },4)
            
    } 

        catch (e) {
            console.log(e)
        }
    }
    
     callVKApi = (id) => new Promise((resolve, reject) => {
            const VK = window.VK;
            console.log('ok')
           
            try {
                VK.Api.call('photos.get',
            {   
                owner_id: String(id),
                album_id:'profile',
                access_token:localStorage.getItem('sid'),
                
                count: 1,
                v: 5.194
            },
            
            (i) => {
                
                console.log(i)
                resolve(i) 
                    }
                )
            }

            catch (e) {
                console.log(e);
            }
            
            })
            
