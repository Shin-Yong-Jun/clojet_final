package com.example.clojet.service;

import com.example.clojet.domain.Board;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BoardService {
    Board createBoard(Board board);
    List<Board> getAllPosts();

    /**
     * 밑에 만들어야 할 것
     */

    void updatePost(Long board_seq, String userEmail);
    void deletePost (Long board_seq);

}
