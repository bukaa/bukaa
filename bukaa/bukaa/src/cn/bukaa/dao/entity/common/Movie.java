package cn.bukaa.dao.entity.common;

import java.sql.Timestamp;

/**
 * Movie entity. @author MyEclipse Persistence Tools
 */

public class Movie implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1946844098392838258L;
	private String id;
	private String title;
	private String source;
	private String imgUrl;
	private String url;
	private String star;
	private Double rate;
	private Double amount;
	private String directors;
	private String actors;
	private String types;
	private String time;
	private String bh;
	private String imgPath;
	private Timestamp addtime;
	private String isDel;
	private String shortComment;
	private String region;
	private String isTv;
	private String playable;
	private String subtype;
	private String duration;
	private String screenwriters;
	private String language;
	private String officialWebsite;
	private String otherName;
	private String imdbUrl;
	private String introduction;
	private String releaseYear;
	private Timestamp updatetime;
	private String releaseTime;

	// Constructors

	/** default constructor */
	public Movie() {
	}

	/** minimal constructor */
	public Movie(String bh) {
		this.bh = bh;
	}

	/** full constructor */
	public Movie(String title, String source, String imgUrl, String url,
			String star, Double rate, Double amount, String directors,
			String actors, String types, String time, String bh,
			String imgPath, Timestamp addtime, String isDel,
			String shortComment, String region, String isTv, String playable,
			String subtype, String duration, String screenwriters,
			String language, String officialWebsite, String otherName,
			String imdbUrl, String introduction, String releaseYear,
			Timestamp updatetime, String releaseTime) {
		this.title = title;
		this.source = source;
		this.imgUrl = imgUrl;
		this.url = url;
		this.star = star;
		this.rate = rate;
		this.amount = amount;
		this.directors = directors;
		this.actors = actors;
		this.types = types;
		this.time = time;
		this.bh = bh;
		this.imgPath = imgPath;
		this.addtime = addtime;
		this.isDel = isDel;
		this.shortComment = shortComment;
		this.region = region;
		this.isTv = isTv;
		this.playable = playable;
		this.subtype = subtype;
		this.duration = duration;
		this.screenwriters = screenwriters;
		this.language = language;
		this.officialWebsite = officialWebsite;
		this.otherName = otherName;
		this.imdbUrl = imdbUrl;
		this.introduction = introduction;
		this.releaseYear = releaseYear;
		this.updatetime = updatetime;
		this.releaseTime = releaseTime;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSource() {
		return this.source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getImgUrl() {
		return this.imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getStar() {
		return this.star;
	}

	public void setStar(String star) {
		this.star = star;
	}

	public Double getRate() {
		return this.rate;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}

	public Double getAmount() {
		return this.amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getDirectors() {
		return this.directors;
	}

	public void setDirectors(String directors) {
		this.directors = directors;
	}

	public String getActors() {
		return this.actors;
	}

	public void setActors(String actors) {
		this.actors = actors;
	}

	public String getTypes() {
		return this.types;
	}

	public void setTypes(String types) {
		this.types = types;
	}

	public String getTime() {
		return this.time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getBh() {
		return this.bh;
	}

	public void setBh(String bh) {
		this.bh = bh;
	}

	public String getImgPath() {
		return this.imgPath;
	}

	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}

	public Timestamp getAddtime() {
		return this.addtime;
	}

	public void setAddtime(Timestamp addtime) {
		this.addtime = addtime;
	}

	public String getIsDel() {
		return this.isDel;
	}

	public void setIsDel(String isDel) {
		this.isDel = isDel;
	}

	public String getShortComment() {
		return this.shortComment;
	}

	public void setShortComment(String shortComment) {
		this.shortComment = shortComment;
	}

	public String getRegion() {
		return this.region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getIsTv() {
		return this.isTv;
	}

	public void setIsTv(String isTv) {
		this.isTv = isTv;
	}

	public String getPlayable() {
		return this.playable;
	}

	public void setPlayable(String playable) {
		this.playable = playable;
	}

	public String getSubtype() {
		return this.subtype;
	}

	public void setSubtype(String subtype) {
		this.subtype = subtype;
	}

	public String getDuration() {
		return this.duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getScreenwriters() {
		return this.screenwriters;
	}

	public void setScreenwriters(String screenwriters) {
		this.screenwriters = screenwriters;
	}

	public String getLanguage() {
		return this.language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getOfficialWebsite() {
		return this.officialWebsite;
	}

	public void setOfficialWebsite(String officialWebsite) {
		this.officialWebsite = officialWebsite;
	}

	public String getOtherName() {
		return this.otherName;
	}

	public void setOtherName(String otherName) {
		this.otherName = otherName;
	}

	public String getImdbUrl() {
		return this.imdbUrl;
	}

	public void setImdbUrl(String imdbUrl) {
		this.imdbUrl = imdbUrl;
	}

	public String getIntroduction() {
		return this.introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public String getReleaseYear() {
		return this.releaseYear;
	}

	public void setReleaseYear(String releaseYear) {
		this.releaseYear = releaseYear;
	}

	public Timestamp getUpdatetime() {
		return this.updatetime;
	}

	public void setUpdatetime(Timestamp updatetime) {
		this.updatetime = updatetime;
	}

	public String getReleaseTime() {
		return this.releaseTime;
	}

	public void setReleaseTime(String releaseTime) {
		this.releaseTime = releaseTime;
	}

}