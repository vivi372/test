package com.dorrny.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dorrny.board.vo.BoardVO;
@Mapper
public interface BoardMapper {

	// 게시글 리스트
	public List<BoardVO> list();
	
	// 게시글 상세보기
	public BoardVO view(int id);
	
	// 조회수 1 증가
	public void updateHit(int id);
	
	// 게시글 등록
	public Integer write(BoardVO vo);
	
	// 게시글 수정
	public Integer update(BoardVO vo);
	
	// 게시글 삭제
	public Integer delete(int id);
	
}
