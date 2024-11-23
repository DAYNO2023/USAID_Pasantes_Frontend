import { Component } from '@angular/core';

@Component({
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    value: string | undefined;
    value2!: string;
}
