package cn.bukaa.controller.job;

import java.util.ArrayList;
import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import cn.bukaa.util.redis.RedisUtil;

@Component
public class MessageTask {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Scheduled(cron="0 0/3 * * * ? " )
	public void sendMessageToRedis(){
		List<String> messageList= new ArrayList<String>(); 
		for (int i = 0; i < 10; i++) {
			messageList.add("{id:00000000000"+i+",title:"+i+",content:这是第"+i+"条news"+"}");
		}
		String key = "top10News";
		RedisUtil.set(key, messageList);
		logger.info("成功写入{}条数据,key:{}", messageList.size(), key);
	}
	
}
