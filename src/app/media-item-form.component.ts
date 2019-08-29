import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MediaItemService } from './media-item.service';
import { lookupListToken, lookupLists} from './providers';

@Component({
    selector: 'mw-media-item-form',
    templateUrl: './media-item-form.component.html',
    styleUrls: ['media-item-form.component.css']
})

export class MediaItemFormComponent {

    form;

    constructor(
        private formBuilder: FormBuilder, 
        private mediaItemService: MediaItemService,
        @Inject(lookupListToken) public lookupLists ){}
    
    ngOnInit(){
        this.form = this.formBuilder.group({
        medium: this.formBuilder.control('Movies'),
        name: this.formBuilder.control('', 
            Validators.compose([
                Validators.required,
                Validators.pattern('[\\w\\-\\s\\/]+')])),
        category: this.formBuilder.control(''),
        year: this.formBuilder.control('', this.yearValidator)});
    }

    yearValidator(control){
        if(control.value.trim().length ===0 ){
            return null;
        }

        let year = parseInt(control.value);
        let minYear = 1990;
        let maxYear = 2100;

        if(year >= minYear && year <=maxYear){
            return null;
        }else{
            console.log('ss');
            return {'year':{
                'min': minYear,
                'max': maxYear
            }};
        }
    }

    onSubmit(mediaItem){
        //console.log(mediaItem);
        this.mediaItemService.add(mediaItem).subscribe();
    }
}