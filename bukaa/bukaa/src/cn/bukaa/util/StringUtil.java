package cn.bukaa.util;

import org.apache.commons.codec.net.URLCodec;

public class StringUtil {
	
	public static URLCodec urlCodec = new URLCodec();
	
	public static final boolean isNotEmpty(String str){
		return (str != null) && !"".equals(str.trim());
	}
	
	public static final boolean isEmpty(String str){
		return !isNotEmpty(str);
	}

	
	public static String urlDecode(String str, String charset) {
		try {
			return urlCodec.decode(str, charset);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	public static String[] splitEx(String str, String split) {
		String[] arr = {};
		if(str != null){
			arr = str.split(split);
		}
		return arr;
	}

}
