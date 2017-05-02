import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'upload-dialog',
    templateUrl: './upload.component.html',
    styleUrls: [ './upload.component.css' ]
})
export class UploadComponent {
    allowDrop: boolean = false;
    data: Array<any> = new Array<any>();
    @Output() dataDrop: EventEmitter<any> = new EventEmitter();

    dragover($event){
        $event.stopPropagation();
        $event.preventDefault();
    }

    fileDrop($event){
        $event.stopPropagation();
        $event.preventDefault();
        $event.dataTransfer.getFilesAndDirectories().then((filesAndDirs)=>{
            this.data = [];
            this.iterateFilesAndDirs(filesAndDirs, '/');
            this.dataDrop.emit(this.data);
        });
    }

    private iterateFilesAndDirs(filesAndDirs, path) {
        let i: number = 0
        for (i = 0; i < filesAndDirs.length; i++) {
            if (typeof filesAndDirs[i].getFilesAndDirectories === 'function') {
                let path = filesAndDirs[i].path;
                filesAndDirs[i].getFilesAndDirectories().then((subFilesAndDirs)=>{
                    this.iterateFilesAndDirs(subFilesAndDirs, path);
                });
            } else {
                this.uploadFile(filesAndDirs[i], path);
            }
        }
    };

    private uploadFile(file, path) {
        this.data.push({path: path, file: file});
    };
}
