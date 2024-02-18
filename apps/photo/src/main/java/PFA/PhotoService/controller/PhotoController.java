package PFA.PhotoService.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import PFA.PhotoService.entities.PhotoEntity;
import PFA.PhotoService.service.PhotoService;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class PhotoController {
    final private PhotoService service;

    public PhotoController(PhotoService service) {
        this.service = service;
    }
    
    @GetMapping("photo")
    List<PhotoEntity> findAll(){
        return this.service.findAll();
    }

    // @PostMapping("photo")
    // PhotoEntity create(@RequestBody PhotoCreateDto photoDto){
    //     try {
    //         this.service.create(photoDto);
    //     } catch (Exception e) {
            
    //     }
    // }
}
