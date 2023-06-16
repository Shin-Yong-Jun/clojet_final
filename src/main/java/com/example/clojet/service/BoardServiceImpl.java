package com.example.clojet.service;

import com.example.clojet.domain.Board;
import com.example.clojet.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{
    private final BoardRepository boardRepository;

    @Override
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    @Override
    public List<Board> getAllPosts() {
        return boardRepository.findAll();
    }


    @Override
    public void deletePost(Long boardSeq) {

    }
}
