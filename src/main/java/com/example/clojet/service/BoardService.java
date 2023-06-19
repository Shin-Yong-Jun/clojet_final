package com.example.clojet.service;

import com.example.clojet.domain.Board;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface BoardService {
    Board createBoard(Board board);
    List<Board> getAllPosts();

    /**
     * 밑에 만들어야 할 것
     */

    void deletePost (Long boardSeq);

}
