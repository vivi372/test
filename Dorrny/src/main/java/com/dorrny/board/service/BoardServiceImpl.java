package com.dorrny.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.dorrny.board.mapper.BoardMapper;
import com.dorrny.board.vo.BoardVO;

import lombok.extern.log4j.Log4j2;
@Service("BoardServiceImpl")
@Qualifier("BoardServiceImpl")
@Log4j2
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardMapper mapper;
	
	@Override
	public List<BoardVO> list() {
		// TODO Auto-generated method stub
		log.info("BoardServiceImpl List..........................");
		return mapper.list();
	}

	@Override
	public BoardVO view(int id) {
		// TODO Auto-generated method stub
		mapper.updateHit(id);
		return mapper.view(id);
	}

	@Override
	public Integer write(BoardVO vo) {
		// TODO Auto-generated method stub
		return mapper.write(vo);
	}

	@Override
	public Integer update(BoardVO vo) {
		// TODO Auto-generated method stub
		return mapper.update(vo);
	}

	@Override
	public Integer delete(int id) {
		// TODO Auto-generated method stub
		return mapper.delete(id);
	}

}
