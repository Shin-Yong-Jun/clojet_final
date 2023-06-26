package com.example.clojet.controller;

import com.example.clojet.domain.Board;
import com.example.clojet.repository.BoardRepository;
import com.example.clojet.service.BoardServiceImpl;
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
    public ResponseEntity<Optional<List<Board>>> getUserPost(@PathVariable Long uId, @RequestHeader(value = "checkLogin") Long getSessionUid) {
        if (getSessionUid == uId) {
            return ResponseEntity.ok(boardService.getUserPosts(uId));
        } else {
            throw new IllegalArgumentException("비정상적인 접근입니다.");
        }
    }

    @GetMapping("/myqna/inquiry")
    public void showPostDetail(@RequestParam("boardSeq") Long boardSeq) {
        boardService.showBoardDetail(boardSeq);
    }

    @PutMapping("/updatepost/{boardSeq}")
    public ResponseEntity<Board> updateBoard(@RequestBody Board board, @PathVariable Long boardSeq) {
        Board updateboard = boardRepository.getReferenceById(boardSeq);
        updateboard.setTitle(board.getTitle());
        updateboard.setContent(board.getContent());

        return ResponseEntity.ok(boardRepository.save(updateboard));
    }

    @DeleteMapping("/deletepost/{boardSeq}")
    public void deletePost(@PathVariable Long boardSeq, @RequestHeader(value = "checkLogin") Long getSessionUid) {
        boardService.deletePost(boardSeq, getSessionUid);
    }

}
