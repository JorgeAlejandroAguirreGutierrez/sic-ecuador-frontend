import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  @ViewChild('preview', { static: true }) preview;
  @ViewChild('image', { static: true }) image;
  @ViewChild('file', { static: true }) file;
  enabled: boolean;
  zoom: number;
  ratio: number;
  type: string;
  shape: string;
  cursor: string;
  cursorgap: number;
  mouseout: string;

  ngOnInit() {
    this.enabled = true;
    this.zoom = 2.5;
    this.ratio = 100;
    this.type = 'center';
    this.shape = 'circle';
    this.cursor = 'zoom-in';
    this.cursorgap = 10 ;
    this.mouseout = 'hidden';
  }

  togleEnabled(event) {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.preview.enable();
    } else {
      this.preview.disable();
    }
  }

  changeZoom(event) {
    this.zoom = Number(event.target.value);
    this.preview.changeZoom(this.zoom);
  }

  changeRatio(event) {
    this.ratio = Number(event.target.value);
    this.preview.changeRatio(this.ratio);
  }

  changeType(event): void {
    this.type = event.target.value;
    this.preview.changeType(this.type);
  }

  changeShape(event): void {
    this.shape = event.target.value;
    this.preview.changeShape(this.shape);
  }

  changeCursor(event): void {
    this.cursor = event.target.value;
    this.preview.changeCursor(this.cursor);
  }

  changeCursorgap(event): void {
    this.cursorgap = Number(event.target.value);
    this.preview.changeCursorgap(this.cursorgap);
  }

  changeMouseout(event): void {
    this.mouseout = event.target.value;
    this.preview.changeMouseout(this.mouseout);
  }

  loadImage(event): void {
    const preview = this.image.nativeElement;
    const file    = this.file.nativeElement.files[0];
    const reader  = new FileReader();

    if (preview) {
      reader.addEventListener('load', () => {
        preview.src = reader.result;
      }, false);
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  zoomLoaded(target): void {
    console.log(target);
  }

  zoomError(error): void {
    console.error(error);
  }
}
