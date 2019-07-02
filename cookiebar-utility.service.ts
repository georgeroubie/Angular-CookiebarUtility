// Angular Modules
import { Injectable } from '@angular/core';

@Injectable()
export class CookiebarUtility {
    private cookieEntry = 'cb-enabled={value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
    private message: string = 'WE USE COOKIES TO TRACK USAGE AND PREFERENCES';
    private acceptText: string = 'I UNDERSTAND';
    private acceptButton: string = `<a href="" class="cb-enable">${this.acceptText}</a>`;
    private policyText: string = 'READ MORE';
    private policyURL: string = 'https://www.website.com/security-and-privacy-policy';
    private policyButton: string = `<a href="${this.policyURL}" class="cb-policy" target="_blank">${this.policyText}</a>`;

    constructor() {
        this.policyButton = ''; // Comment this line if you want to show the policy button
    }

    public cookiebarInitialization(): void {
        if(this.retrieveCurrentCookiePreference() !== 'accepted') {
            this.createCookieBar();
            this.acceptCookiesEvent();
        }
    }

    private retrieveCurrentCookiePreference(): string {
        const cookies: string[] = document.cookie.split('; ');
        let cookieValue: string = '';
        for (let i = 0; i < cookies.length; i++) {
            if(cookies[i].split('=')[0] === 'cb-enabled') {
                cookieValue = cookies[i].split('=')[1];
            }
        }
        return cookieValue;
    }

    private createCookieBar(): void {
        const cookieBar = document.createElement('div');
        cookieBar.id = 'cookie-bar';
        cookieBar.className = 'fixed bottom';
        cookieBar.innerHTML = this.message + this.acceptButton + this.policyButton;
        document.body.appendChild(cookieBar);
    }

    private acceptCookiesEvent(): void {
        document.querySelector('#cookie-bar .cb-enable').addEventListener('click', (event) => {
            event.preventDefault();
            document.cookie = this.cookieEntry.replace('{value}', 'accepted');
            const cookieBar: any = document.querySelector('#cookie-bar');
            cookieBar.style['bottom'] = '-50px';
            setTimeout(() => cookieBar.parentNode.removeChild(cookieBar), 2000);
        });
    }
}
