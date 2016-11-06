package cn.bukaa.util;

public class StringUtil {
	
	public static final boolean isNotEmpty(String str){
		if(str == null){
			return false;
		}else if("".equals(str)){
			return false;
		}
		return true;
	}

}
