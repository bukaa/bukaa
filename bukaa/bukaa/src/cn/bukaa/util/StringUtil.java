package cn.bukaa.util;

public class StringUtil {
	
	public static final boolean isNotEmpty(String str){
		if(str == null){
			return true;
		}else if("".equals(str)){
			return true;
		}
		return false;
	}

}
