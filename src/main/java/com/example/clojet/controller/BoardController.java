package com.example.clojet.controller;

import com.example.clojet.domain.Board;
import com.example.clojet.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class BoardController {
    private final BoardRepository boardRepository;
    @PostMapping(value = "/createpost")
    public Board createBoard(@RequestBody Board board){
        return boardRepository.save(board);
    }

    @GetMapping
    public ResponseEntity<List<Board>> getAllPosts(){
        List<Board> boardlist = boardRepository.findAll();
        return ResponseEntity.ok(boardlist);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Board> getBoardById(@PathVariable Long id){
        Optional<Board> optionalBoard = boardRepository.findById(id);
        if (optionalBoard.isPresent()){
            return ResponseEntity.ok(optionalBoard.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
