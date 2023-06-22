package com.example.clojet.controller;

import com.example.clojet.domain.Board;
import com.example.clojet.repository.BoardRepository;
import com.example.clojet.service.BoardServiceImpl;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
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
    public Board createBoard(@RequestBody Board board) {
        return boardRepository.save(board);
    }

    @GetMapping("/myqna/list/showallposts")
    public List<Board> getAllPosts() {
        return boardService.getAllPosts();
    }

    @GetMapping(path = "/myqna/list/{uId}")
    public Optional<List<Board>> getUserPost(@PathVariable Long uId, @RequestHeader(value = "checkLogin") Long user) {
        if (user == uId) {
            return boardService.getUserPosts(uId);
        } else {
            throw new IllegalArgumentException("비정상적인 접근입니다.");
        }
    }

    @GetMapping("/myqna/inquiry")
    public void showPostDetail(@RequestParam("boardSeq") Long boardSeq) {
        boardService.showBoardDetail(boardSeq);
    }

    @PutMapping("/updatepost/{boardSeq}")
    public ResponseEntity<?> updateBoard(@RequestBody Board board, @PathVariable Long boardSeq) {
        Board updateboard = boardRepository.getReferenceById(boardSeq);
        updateboard.setTitle(board.getTitle());
        updateboard.setContent(board.getContent());
        boardRepository.save(updateboard);

        return new ResponseEntity<>("{}", HttpStatus.OK);
    }

    @DeleteMapping("/deletepost/{boardSeq}")
    public void deletepost(@PathVariable Long boardSeq) {
        try {
            boardRepository.deleteById(boardSeq);
        } catch (IllegalArgumentException e) {
            System.out.println(e);
        }
    }

}
