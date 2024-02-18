package PFA.PhotoService.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import PFA.PhotoService.entities.PhotoEntity;
import PFA.PhotoService.repository.PhotoRepository;

@Service
public class PhotoService {
    final private PhotoRepository repository;

    public PhotoService(PhotoRepository repository) {
        this.repository = repository;
    }

    public List<PhotoEntity> findAll() {
        final List<PhotoEntity> result = new ArrayList<PhotoEntity>();

        final Iterable<PhotoEntity> photos = this.repository.findAll();
        photos.forEach(result::add);

        return result;
    }

    // public PhotoEntity create(PhotoCreateDto photoDto){
    // }
}
