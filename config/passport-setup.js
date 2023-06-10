const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const User = require('../models/teachers-log');
const passport = require('passport');
require('dotenv').config()



const myGoogleStrategy = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, async (acessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try{
            let user = await User.findOne({googleId: profile.id})

            if(user) {
                done(null, user)
                console.log(`User exists: ${user}`)
            } else {
                user = await User.create(newUser)
                done(null, user)
                console.log(`New user: ${user}`);
            }
        } catch(err) {
            console.log(err)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    
    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(null, user)
        })
    })
}

module.exports = myGoogleStrategy;