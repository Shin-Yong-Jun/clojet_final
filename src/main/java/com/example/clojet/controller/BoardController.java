package com.example.clojet.controller;

import com.example.clojet.domain.Board;
import com.example.clojet.repository.BoardRepository;
import com.example.clojet.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class BoardController {
    private final BoardRepository boardRepository;
    @PostMapping(value = "/createpost")
    public Board createBoard(@RequestBody Board board){
        return boardRepository.save(board);
    }

    @GetMapping("/myqna/list")
    public ResponseEntity<List<Board>> getAllPosts(){
        List<Board> boardlist = boardRepository.findAll();
        return ResponseEntity.ok(boardlist);
    }

    @GetMapping("/myqna/list/{userEmail}")
    public Optional<Stream<Board>> getUserPost(@PathVariable String userEmail){
        return Optional.ofNullable(boardRepository.findAll().stream()
                .filter(i -> i.getUserEmail().equals(userEmail)));
    }
    @PutMapping("/updatepost/{id}")
    public ResponseEntity<?> updateBoard(@RequestBody Board board, @PathVariable Long id){
        Board updateboard = boardRepository.getReferenceById(id);
        updateboard.setTitle(board.getTitle());
        updateboard.setContent(board.getContent());
        boardRepository.save(updateboard);

        return new ResponseEntity<>("{}", HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Board> getBoardById(@PathVariable Long id){
//        Optional<Board> optionalBoard = boardRepository.findById(id);
//        if (optionalBoard.isPresent()){
//            return ResponseEntity.ok(optionalBoard.get());
//        }else {
//            return ResponseEntity.notFound().build();
//        }
//    }
}
