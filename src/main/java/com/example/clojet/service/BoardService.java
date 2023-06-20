package com.example.clojet.service;

import com.example.clojet.domain.Board;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardService {
    Board createBoard(Board board);
    List<Board> getAllPosts();

    Optional<List<Board>> getUserPosts(Long id);

    Board showBoardDetail(Long boardSeq);

    /**
     * 밑에 만들어야 할 것
     */

    void deletePost (Long boardSeq);

}
