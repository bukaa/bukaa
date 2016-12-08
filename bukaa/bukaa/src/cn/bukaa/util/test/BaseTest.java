package cn.bukaa.util.test;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

@RunWith(JUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:etc/classes/spring-mvc.xml" })
@Transactional  
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = false) 
public class BaseTest {
	

}
