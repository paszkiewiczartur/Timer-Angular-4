import { Directive, ElementRef, Renderer2, HostListener, AfterViewChecked } from '@angular/core';
import { WindowWrapper } from './window';

@Directive({
    selector: '[appFooterMargin]'
})

export class FooterMarginDirective implements  AfterViewChecked{
    /*@HostListener('window:resize', ['$event']) onResize($event) {
        let value: string = '';
        value += ($event.target.innerHeight - 480);
        value += 'px';
        this.renderer.setStyle(this.elRef.nativeElement, 'margin-top', value);
        console.log("during");
    }*/

    constructor(private elRef: ElementRef, private renderer: Renderer2, private win: WindowWrapper) { }

/*    ngAfterViewChecked(){
        let value: string = '';
        value += window.innerHeight < 480 ? 0 : (window.innerHeight - 480); 
        value += 'px';
        this.renderer.setStyle(this.elRef.nativeElement, 'margin-top', value);    
        console.log("start");
    }*/
    
    
    ngAfterViewChecked(){
        let value: string = '';
        value += this.win.innerHeight < 480 ? 0 : (this.win.innerHeight - 480); 
        value += 'px';
        this.renderer.setStyle(this.elRef.nativeElement, 'margin-top', value);    
        console.log("start");
    }
    
}