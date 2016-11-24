package cn.bukaa.dao.entity.sys;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Entity;

@Entity
public class SysMenu implements Serializable{
	
	private static final long serialVersionUID = 1216626185699227327L;
	
	private String id;
	
	private String parentId;
	
	private String name;
	
	private boolean isDel;
	
	private Timestamp addTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isDel() {
		return isDel;
	}

	public void setDel(boolean isDel) {
		this.isDel = isDel;
	}

	public Timestamp getAddTime() {
		return addTime;
	}

	public void setAddTime(Timestamp addTime) {
		this.addTime = addTime;
	}

}
