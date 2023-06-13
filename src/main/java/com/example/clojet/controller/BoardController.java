package com.example.clojet.controller;

import com.example.clojet.domain.Board;
import com.example.clojet.repository.BoardRepository;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody Board board){
        Board creatBoard = boardRepository.save(board);
        return ResponseEntity.status(HttpStatus.CREATED).body(creatBoard);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Board> updatePost(@PathVariable Long id, @RequestBody Board board){
        Optional<Board> optionalBoard = boardRepository.findById(id);

        return ResponseEntity.ok(optionalBoard.get());
    }



}
