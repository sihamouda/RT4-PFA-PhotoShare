package PFA.PhotoService.dto;

import org.springframework.web.multipart.MultipartFile;

public class PhotoCreateDto {
    private  MultipartFile file;

    public PhotoCreateDto(MultipartFile file) {
        this.file = file;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    
}
