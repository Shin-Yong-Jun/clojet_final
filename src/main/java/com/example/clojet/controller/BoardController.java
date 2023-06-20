package com.example.clojet.controller;

import com.example.clojet.domain.Board;
import com.example.clojet.domain.Member;
import com.example.clojet.repository.BoardRepository;
import com.example.clojet.repository.MemberRepository;
import com.example.clojet.service.BoardServiceImpl;
import com.example.clojet.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class BoardController {
    private final BoardRepository boardRepository;
    private final BoardServiceImpl boardService;

    @PostMapping(value = "/createpost")
    public Board createBoard(@RequestBody Board board){
        return boardRepository.save(board);
    }

    @GetMapping("/myqna/list/showallposts")
    public List<Board> getAllPosts(){
        return boardService.getAllPosts();
    }

    @GetMapping("/myqna/list/{uId}")
    public Optional<List<Board>> getUserPost(@PathVariable Long uId){
        return boardService.getUserPosts(uId);
    }

    @GetMapping("/myqna/inquiry")
    public void showPostDetail(@RequestParam("boardSeq") Long boardSeq){
        boardService.showBoardDetail(boardSeq);
    }

    @PutMapping("/updatepost/{boardSeq}")
    public ResponseEntity<?> updateBoard(@RequestBody Board board, @PathVariable Long boardSeq){
        Board updateboard = boardRepository.getReferenceById(boardSeq);
        updateboard.setTitle(board.getTitle());
        updateboard.setContent(board.getContent());
        boardRepository.save(updateboard);

        return new ResponseEntity<>("{}", HttpStatus.OK);
    }

}
