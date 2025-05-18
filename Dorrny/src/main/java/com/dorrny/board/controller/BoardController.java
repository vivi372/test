package com.dorrny.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dorrny.board.service.BoardService;
import com.dorrny.board.vo.BoardVO;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/board")
@Slf4j
public class BoardController {

	// 서비스 호출
	@Autowired
	private BoardService service;
	
	// 게시판 리스트
	@GetMapping("/list")
	public ResponseEntity<?> list() throws Exception {
		
		log.info("Board Controller list()......................");
		
		return ResponseEntity.ok(service.list());
	}
	
	@GetMapping("/view")
	public ResponseEntity<?> view(@RequestParam("id") int id) throws Exception {
		
		log.info("Board Controller View().......................");
		
		return ResponseEntity.ok(service.view(id));
	}
	
	@PostMapping("/write")
	public ResponseEntity<?> write(@RequestBody BoardVO vo) throws Exception{
		
		log.info("Board Controller Write()................");
		
		vo.setHit(0);
		
		return ResponseEntity.ok(service.write(vo));
	}
	
	@PostMapping("/update")
	public ResponseEntity<?> update(@RequestBody BoardVO vo) throws Exception {
		
		System.out.println("Board Controller Update().............");
		
		service.update(vo);
		
		return ResponseEntity.ok(vo);
	}
	
	@PostMapping("/delete")
	public ResponseEntity<?> delete(@RequestParam("id") int id) throws Exception {
	    log.info("삭제 요청 id = {}", id);
	    service.delete(id);
	    return ResponseEntity.ok().build();
	}
	
	
}
