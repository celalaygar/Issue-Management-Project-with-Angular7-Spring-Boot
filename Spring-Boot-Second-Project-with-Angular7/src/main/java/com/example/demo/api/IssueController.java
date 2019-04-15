package com.example.demo.api;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Dto.IssueDto;
import com.example.demo.Dto.ProjectDto;
import com.example.demo.service.IssueService;
import com.example.demo.util.ApiPaths;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;


@RestController
@RequestMapping(ApiPaths.IssueCtrl.CTRL)
@Api(value = ApiPaths.IssueCtrl.CTRL,description ="Issue APIs")
public class IssueController {

	private final IssueService issueService;
	
	
	public IssueController(IssueService issueService) {
		super();
		this.issueService = issueService;
	}

	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	@ApiOperation(notes="Get By Id operation for Issue",value="Get By Id operation for Issue",response=IssueDto.class)
	public ResponseEntity<IssueDto> getById(@PathVariable(name="id",required=true) Long id) {
		IssueDto IssueDto=issueService.getById(id);
		return ResponseEntity.ok(IssueDto);
	}
	
	@PostMapping
	@ApiOperation(value="Create operation for Issue",response=IssueDto.class)
	public ResponseEntity<IssueDto> createissueDto(@Valid @RequestBody IssueDto issueDto){
		return ResponseEntity.ok(issueService.save(issueDto));
	}
	
	@PutMapping("/{id}")
	@ApiOperation(value="Update for Issue",response=IssueDto.class)
	//@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<IssueDto> updateissueDto(@PathVariable(name="id",required=true) Long id,@Valid @RequestBody IssueDto issueDto){
		return ResponseEntity.ok(issueService.update(id, issueDto));
	}
	
	@DeleteMapping("/{id}")
	@ApiOperation(value="Delete operation for Issue",response=Boolean.class)
	public ResponseEntity<Boolean> deleteissueDto(@PathVariable(name="id", required=true) Long id) {
		
		return ResponseEntity.ok(issueService.delete(id));
	}
	
}