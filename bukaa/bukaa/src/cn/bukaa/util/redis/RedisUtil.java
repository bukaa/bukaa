package cn.bukaa.util.redis;

import java.util.List;

import redis.clients.jedis.Jedis;

public class RedisUtil {
	
	public static Jedis jedis = RedisPoolUtil.getJedis();

	/**
	 * 插入List
	 * @param key
	 * @param list
	 * @return
	 */
	public static Long set(String key, List<String> list){
		if(list == null || jedis == null){
			return 0L;
		}
		return	jedis.lpush(key, (String[])list.toArray());
	}
	
	/**
	 * 插入数组
	 * @param key
	 * @param str
	 * @return
	 */
	public static Long set(String key, String[] str){
		if(str == null || jedis == null){
			return 0L;
		}
		return	jedis.lpush(key, str);
	}
	
	/**
	 * 删除key
	 * @param key
	 */
	public static Long remove(String key){
		return jedis.del(key);
	}
  
}

