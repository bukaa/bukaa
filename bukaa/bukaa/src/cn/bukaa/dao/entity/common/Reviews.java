package cn.bukaa.dao.entity.common;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;

/**
 * Reviews entity. @author MyEclipse Persistence Tools
 */

public class Reviews implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = -7508585554466695167L;
	private String id;
	private String bh;
	private String movieBh;
	private String author;
	private String shortContent;
	private String title;
	private String titleLink;
	private String username;
	private String userPhotoUrl;
	private String star;
	private String time;
	private byte[] html;
	private String votes;
	private Timestamp addtime;
	private Timestamp updatetime;
	private Integer useful_count;
	private Integer useless_count;

	// Constructors

	/** default constructor */
	public Reviews() {
	}

	/** minimal constructor */
	public Reviews(String bh, String movieBh) {
		this.bh = bh;
		this.movieBh = movieBh;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getBh() {
		return this.bh;
	}

	public void setBh(String bh) {
		this.bh = bh;
	}

	public String getMovieBh() {
		return this.movieBh;
	}

	public void setMovieBh(String movieBh) {
		this.movieBh = movieBh;
	}

	public String getAuthor() {
		return this.author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getShortContent() {
		return this.shortContent;
	}

	public void setShortContent(String shortContent) {
		this.shortContent = shortContent;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitleLink() {
		return this.titleLink;
	}

	public void setTitleLink(String titleLink) {
		this.titleLink = titleLink;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserPhotoUrl() {
		return this.userPhotoUrl;
	}

	public void setUserPhotoUrl(String userPhotoUrl) {
		this.userPhotoUrl = userPhotoUrl;
	}

	public String getStar() {
		return this.star;
	}

	public void setStar(String star) {
		this.star = star;
	}

	public String getTime() {
		return this.time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getHtml() {
		if(this.html != null){
			try {
				return new String(this.html, "UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		return "";
	}

	public void setHtml(byte[] html) {
		this.html = html;
	}

	public String getVotes() {
		return this.votes;
	}

	public void setVotes(String votes) {
		this.votes = votes;
	}

	public Timestamp getAddtime() {
		return this.addtime;
	}

	public void setAddtime(Timestamp addtime) {
		this.addtime = addtime;
	}

	public Timestamp getUpdatetime() {
		return this.updatetime;
	}

	public void setUpdatetime(Timestamp updatetime) {
		this.updatetime = updatetime;
	}

	public Integer getUseful_count() {
		return useful_count;
	}

	public void setUseful_count(Integer useful_count) {
		this.useful_count = useful_count;
	}

	public Integer getUseless_count() {
		return useless_count;
	}

	public void setUseless_count(Integer useless_count) {
		this.useless_count = useless_count;
	}
	
}