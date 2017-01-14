package cn.bukaa.util.test;

import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;


@RunWith(JUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:etc/classes/test/spring-mvc.xml", "file:etc/classes/test/spring-dao.xml"})
@Transactional  
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true) 
public class BaseTest {
	
	public Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/**
	 * 已JSON形式打印对象
	 * @param obj
	 */
	public void toJsonString(Object obj){
		//logger.info("\n###################\n"+JSON.toJSON(obj).toString()+"\n###################");
	}
}
