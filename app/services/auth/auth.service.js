"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
var auth_config_1 = require('./auth.config');
var http_1 = require('@angular/http');
var Auth = (function () {
    function Auth(_http) {
        var _this = this;
        this._http = _http;
        // Configure Auth0
        this.lock = new Auth0Lock(auth_config_1.myConfig.clientID, auth_config_1.myConfig.domain, {
            additionalSignUpFields: [{
                    name: "address",
                    placeholder: "enter your address",
                    icon: "https://example.com/address_icon.png",
                    validator: function (value) {
                        // only accept addresses with more than 10 chars
                        return value.length > 10;
                    }
                }],
            theme: {
                logo: '/app/src/img/giftjoy2.png',
                primaryColor: '#3F51B5'
            },
            languageDictionary: {
                title: "giftjoy"
            }
        });
        // Set userProfile attribute if already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            // Fetch profile information
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }
                profile.user_metadata = profile.user_metadata || {};
                localStorage.setItem('profile', JSON.stringify(profile));
                _this.userProfile = profile;
                localStorage.setItem('user_id', _this.userProfile.identities[0].user_id);
            });
        });
    }
    ;
    Auth.prototype.getuserid = function () {
        return this.userid;
    };
    Auth.prototype.login = function () {
        // Call the show method to display the widget.
        this.lock.show();
    };
    ;
    Auth.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        return angular2_jwt_1.tokenNotExpired();
    };
    ;
    Auth.prototype.logout = function () {
        // Remove token and profile from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
    };
    ;
    Auth.prototype.getAccessToken = function () {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://erikweisz.auth0.com/oauth/token",
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "data": "{\"client_id\":\"IenZah8aIuoBeGPXqMCZBfQ2OOgCZTbA\",\"client_secret\":\"QrJ04zEEr4SrhRfBzG7cNxTCfRaXFXbx-EMJgt4uV5x8WEiwi38nGv4RRj6WygxW\",\"audience\":\"https://erikweisz.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}"
        };
        $.ajax(settings).done(function (response) {
            this.accessToken = response;
            console.log('access_token -> ' + this.accessToken.access_token);
            localStorage.setItem('access_token', this.accessToken.access_token);
        });
    };
    Auth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.service.js.map