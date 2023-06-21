package com.example.clojet.service;

import com.example.clojet.domain.Board;
import com.example.clojet.repository.BoardRepository;
import com.example.clojet.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    @Override
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    @Override
    public List<Board> getAllPosts() {
        return boardRepository.findAll();
    }


    @Override
    public Optional<List<Board>> getUserPosts(Long uId) {
        String userEmail = memberRepository.getReferenceById(uId).getUserEmail();

        return Optional.ofNullable(
                boardRepository.findAll().stream()
                        .filter(i -> i.getUserEmail().equals(userEmail))
                        .toList()
        );
    }

    @Override
    public Board showBoardDetail(Long boardSeq) {
        return boardRepository.getReferenceById(boardSeq);
    }

    @Override
    public void deletePost(Long boardSeq) {
        boardRepository.deleteById(boardSeq);
    }

}
